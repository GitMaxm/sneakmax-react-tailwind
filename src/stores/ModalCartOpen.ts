import { makeAutoObservable } from 'mobx';

class ModalCartOpen {
  isCartModalOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  openCartModal = () => {
    this.isCartModalOpen = true;
  };

  closeCartModal = () => {
    this.isCartModalOpen = false;
  };
}

export default new ModalCartOpen();
