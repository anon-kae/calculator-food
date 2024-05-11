/**
 * Interface IDiscount
 */
interface IDiscount {
  applyDiscount(totalPrice: number, orders?: Order[]): number;
}

/**
 * Product class
 */
export class Product {
  public name: string;
  public price: number;

  /**
   * Constructor
   * @param {string} name
   * @param {number} price 
   */
  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

/**
 * Order class
 */
export class Order {
  public product: Product;
  public quantity: number;

  /**
   * Constructor
   * @param {Product} product
   * @param {number} quantity 
   */
  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }

  /**
   * Get total price of the order
   * @returns {number}
   */
  public getTotalPrice(): number {
    return this.product.price * this.quantity;
  }
}

/**
 * MembershipDiscount class
 */
export class MembershipDiscount implements IDiscount {
  /**
   * Apply discount
   * @param {number} totalPrice
   * @returns {number}
   */
  public applyDiscount(totalPrice: number): number {
    const discount = totalPrice * 0.1;
    totalPrice -= discount;

    return totalPrice;
  }
}

/**
 * OrangeDiscount class
 */
export class OrangeDiscount implements IDiscount {
  /**
   * Apply discount
   * @param {number} totalPrice
   * @param {Order[]} orders
   * @returns {number}
   */
  public applyDiscount(totalPrice: number, orders: Order[]): number {
    const orangeOrders = orders.filter(order => order.product.name === 'orange');
    const totalOrangeQuantity = orangeOrders.reduce((acc, order) => acc + order.quantity, 0);

    if (totalOrangeQuantity > 2) {
      const discount = totalPrice * 0.05;
      totalPrice -= discount;
    }
    return totalPrice;
  }
}

/**
 * Calculator class
 */
export class Calculator {
  private membershipDiscount: MembershipDiscount;
  private orangeDiscount: OrangeDiscount;

  /**
   * Constructor
   */
  constructor() {
    this.membershipDiscount = new MembershipDiscount();
    this.orangeDiscount = new OrangeDiscount();
  }


  /**
   * Calculate price
   * @param {Order[]} orders
   * @param {boolean} hasMembershipCard
   * @returns {number}
   */
  public calculatePrice(orders: Order[], hasMembershipCard?: boolean): number {
    let totalPrice = orders.reduce((acc, order) => acc + order.getTotalPrice(), 0);

    if (hasMembershipCard) {
      totalPrice = this.membershipDiscount.applyDiscount(totalPrice);
    }

    totalPrice = this.orangeDiscount.applyDiscount(totalPrice, orders);

    return totalPrice;
  }
}


const calculator = new Calculator();

const productList = [
  new Product('red', 50),
  new Product('green', 40),
  new Product('blue', 30),
  new Product('yellow', 50),
  new Product('pink', 80),
  new Product('purple', 90),
  new Product('orange', 120),
];

const orders = [
  new Order(productList[0], 1), // สั่งชุดสีแดง 1 ชุด
  new Order(productList[1], 1), // สั่งชุดสีเขียว 1 ชุด
  new Order(productList[6], 3), // สั่งชุดสีส้ม 3 ชุด
];

const price = calculator.calculatePrice(orders);
console.log('Total price:', price); 
