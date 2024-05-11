import { describe, expect, beforeEach, it } from '@jest/globals';
import { Product, Order, Calculator } from '../index';

describe('Calculator', () => {
  let calculator: Calculator;
  let productList: Product[];

  beforeEach(() => {
    calculator = new Calculator();
    productList = [
      new Product('red', 50),
      new Product('green', 40),
      new Product('blue', 30),
      new Product('yellow', 50),
      new Product('pink', 80),
      new Product('purple', 90),
      new Product('orange', 120),
    ];
  });

  it('should calculate total price without discounts', () => {
    const orders = [
      new Order(productList[0], 1), // red
      new Order(productList[1], 1), // green
    ];

    const price = calculator.calculatePrice(orders);
    expect(price).toBe(90); // 50 (red) + 40 (green) = 90
  });

  it('should apply membership discount correctly', () => {
    const orders = [
      new Order(productList[0], 1), // red
      new Order(productList[1], 1), // green
    ];

    const price = calculator.calculatePrice(orders, true);
    // Without discount: 90
    // With membership discount (10% off): 90 - (90 * 0.1) = 81
    expect(price).toBe(81);
  });

  it('should apply orange discount correctly', () => {
    const orders = [
      new Order(productList[6], 3), // orange
    ];

    const price = calculator.calculatePrice(orders);
    // Without discount: 120 * 3 = 360
    // With orange discount (5% off): 360 - (360 * 0.05) = 342
    expect(price).toBe(342);
  });

  it('should apply both discounts correctly', () => {
    const orders = [
      new Order(productList[0], 1), // red
      new Order(productList[1], 1), // green
      new Order(productList[6], 3), // orange
    ];

    const price = calculator.calculatePrice(orders, true);
    // Without discount: 50 + 40 + (120 * 3) = 450
    // With membership discount (10% off): 450 - (450 * 0.1) = 405
    // With orange discount (5% off): 405 - (405 * 0.05) = 350.55 (rounded to 2 decimal places)
    console.log(price);
    expect(price).toBeCloseTo(384.75);
  });
});
