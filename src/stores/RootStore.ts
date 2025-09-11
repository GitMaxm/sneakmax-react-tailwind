import ProductsStore from "./ProductsStore"
import FilterStore from "./FilterStore"
import CartStore from "./CartStore";
import ModalStore from "./ModalStore";
import ModalCartOpen from "./ModalCartOpen";

class RootStore {
    productsStore = ProductsStore;
    filterStore = FilterStore;
    cartStore = CartStore;
    modalStore = ModalStore;
    modalCartOpen = ModalCartOpen;
}

export default RootStore;