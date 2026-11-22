import Navigation from '../layout/Navigation';
import Button from '../ui/Button';

const Header = () => {
  return (
    <header className="text-white">
      <div className="container">
        <div className="relative border-b border-white">
          <Navigation showCart={true} />
        </div>

        <div className="header-bottom py-10 sm:py-16 md:py-24">
          <div className="header-bottom-content max-w-xl">
            <h1 className="title-1 mb-10">
              Кроссовки известных брендов с доставкой по России и СНГ
            </h1>
            <p className="mb-10">
              Мы продаем кроссовки брендов Nike, Adidas, Puma, Reebok,
              Converse и многие другие по низким ценам
            </p>
            <Button
              href="#catalog"
              as="a"
              ariaLabel="Перейти к каталогу кроссовок"
            >
              Перейти к покупкам
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
