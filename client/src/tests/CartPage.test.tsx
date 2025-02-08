import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit"; 
import cartReducer from "../store/cartSlice"; 
import CartPage from "../pages/Cart.tsx";
import "@testing-library/jest-dom"
describe("CartPage", () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cart: cartReducer, 
      },
      preloadedState: {
        cart: {
          items: [
            {
              id: "1",
              title: "Товар 1",
              description: "Описание товара 1",
              price: 100,
              quantity: 2,
              images: "/path/to/image1.jpg",
            },
          ],
        },
      },
    });
  });

  test("отображает товары в корзине", () => {
    render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );

    expect(screen.getByText("Товар 1")).toBeInTheDocument();
    expect(screen.getByText("Описание товара 1")).toBeInTheDocument();
    expect(screen.getByText("100 ₽")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test('увеличивает количество товара при нажатии на кнопку "+"', () => {
    render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );

    fireEvent.click(screen.getByText("+"));


    const state = store.getState();
    expect(state.cart.items[0].quantity).toBe(3);
  });

  test('удаляет товар из корзины при нажатии на кнопку "Удалить"', () => {
    render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );

    fireEvent.click(screen.getByText("Удалить"));

    const state = store.getState();
    expect(state.cart.items.length).toBe(0);
  });
});
