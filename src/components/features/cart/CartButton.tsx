import { observer } from 'mobx-react-lite';
import { useStores } from '@/Context/rootStoreContext';

interface CartButtonProps {
  onClick: () => void;
}

const CartButton = observer(({ onClick }: CartButtonProps) => {
  const { cartStore } = useStores();

  return (
    <button
      onClick={onClick}
      className="relative flex cursor-pointer items-center gap-2
        transition hover:scale-115"
      aria-label={`Открыть корзину. Товаров в корзине: ${cartStore.totalItems}`}
    >
      <img src="img/header/cart.svg" alt="Корзина" />

      <span
        className="absolute -top-2 -right-2 flex h-5 w-5 items-center
          justify-center rounded-full bg-red-500 text-xs text-white"
      >
        {cartStore.totalItems}
      </span>
    </button>
  );
});

export default CartButton;
