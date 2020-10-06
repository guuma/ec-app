const initialState = {
  loading: {
    state: false,
    text: '',
  },
  products: {
    list: [],
  },
  users: {
    cart: [],
    customer_id: '',
    payment_method_id: '',
    email: '',
    orders: [],
    isSignedIn: false,
    role: '',
    uid: '',
    username: '',
  },
};

export default initialState;
