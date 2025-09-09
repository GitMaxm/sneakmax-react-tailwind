import CartButton from "../features/cart/CartButton";
import { navLinks } from "@/helper/navLink";

// layout/Navigation.tsx
interface NavigationProps {
    onCartClick: () => void;
    cartItemsCount?: number;
}

const Navigation = ({ onCartClick }: NavigationProps) => {
    return (
        <div className="flex items-center justify-between py-3 border-b border-white gap-4 flex-wrap">
            {/* Логотип */}
            <a href="#!" className="logo">SneakMax</a>

            {/* Навигация */}
            <nav className="nav">
                <ul className="flex items-center gap-5 2xl:gap-9 flex-wrap">
                    {navLinks.map((item) => (
                        <li key={item.name}>
                            <a href={item.href} className="hover:underline">{item.name}</a>
                        </li>
                    ))}
                    <li>
                        <CartButton onClick={onCartClick} />
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navigation;