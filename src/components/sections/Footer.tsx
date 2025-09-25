import Navigation from "../layout/Navigation";

const Footer = () => {

    return (
        <footer className="text-white bg-[var(--text-color-main)]">
            <div className="container">
                <div>
                    <Navigation showCart={false} />
                </div>
            </div>
        </footer>
    );
};

export default Footer;