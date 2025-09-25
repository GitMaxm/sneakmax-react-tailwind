import { observer } from "mobx-react-lite";
import CartButton from "../features/cart/CartButton";
import { navLinks } from "@/data/navLink";
import { useStores } from "@/Context/rootStoreContext";

interface NavigationProps {
    showCart: boolean;
}

const Navigation = observer(({ showCart }: NavigationProps) => {

    const { modalCartOpen } = useStores()

    const handleCartModal = () => {
        modalCartOpen.openCartModal();
    };

    return (
        <div className="flex items-center justify-between py-3 gap-4 flex-wrap">
            {/* Логотип */}
            <a href="#" className="logo">SneakMax</a>

            {/* Навигация */}
            <nav className="nav">
                <ul className="flex items-center gap-5 2xl:gap-9 flex-wrap">
                    {navLinks.map((item) => (
                        <li key={item.name}>
                            <a href={item.href} className="hover:underline">{item.name}</a>
                        </li>
                    ))}
                    {showCart && <li>
                        <CartButton onClick={handleCartModal} />
                    </li>}
                </ul>
            </nav>
        </div>
    );
});

export default Navigation;