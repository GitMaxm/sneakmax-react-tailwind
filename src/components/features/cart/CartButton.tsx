import { observer } from "mobx-react-lite";
import { useStores } from "@/Context/rootStoreContext";

// features/cart/CartButton.tsx
interface CartButtonProps {
    onClick: () => void;
}

const CartButton = observer(({ onClick }: CartButtonProps) => {

    const { cartStore } = useStores();

    return (
        <button
            onClick={onClick}
            className="relative flex items-center gap-2 cursor-pointer hover:scale-115 transition"
            aria-label={`Открыть корзину. Товаров в корзине: ${cartStore.totalItems}`}
        >
            <img src="img/header/cart.svg" alt="Корзина" />

            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {cartStore.totalItems}
            </span>

        </button>
    );
});

export default CartButton;