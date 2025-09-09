import ProductsStore from "./ProductsStore"
import FilterStore from "./FilterStore"
import CartStore from "./CartStore";
import ModalStore from "./ModalStore";

class RootStore {
    productsStore = ProductsStore;
    filterStore = FilterStore;
    cartStore = CartStore;
    modalStore = ModalStore;
}

export default RootStore;