// layout/Header.tsx
// import { useState } from "react";
import Navigation from "../layout/Navigation";
import Button from "../ui/Button";
// import CartDropdown from "../features/cart/CartDropdown";

const Header = () => {
    // const [isCartOpen, setIsCartOpen] = useState(false);

    // const handleCartModal = () => {
    //     setIsCartOpen(true);
    // };

    // const handleCartClose = () => {
    //     setIsCartOpen(false);
    // };

    return (
        <header className="header text-white">
            <div className="container">
                <div className="relative">
                    <Navigation />
                    {/* {isCartOpen && <CartDropdown onClose={handleCartClose} />} */}
                </div>

                {/* Нижняя часть шапки */}
                <div className="header-bottom md:py-24 sm:py-16 py-10">
                    <div className="header-bottom-content max-w-xl">
                        <h1 className="title-1 mb-10">Кроссовки известных брендов с доставкой по России и СНГ</h1>
                        <p className="mb-10">Мы продаем кроссовки брендов Nike, Adidas, Puma, Reebok, Converse и многие другие по низким ценам</p>
                        <Button href="#catalog" as="a" ariaLabel="Перейти к каталогу кроссовок">
                            Перейти к покупкам
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;