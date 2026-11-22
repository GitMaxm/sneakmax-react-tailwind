import Navigation from '../layout/Navigation';

const Footer = () => {
  return (
    <footer className="bg-[var(--text-color-main)] text-white">
      <div className="container">
        <div>
          <Navigation showCart={false} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
