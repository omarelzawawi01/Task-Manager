import {configureStore} from '@reduxjs/toolkit';
import sliceReducer from './slices';
const store=configureStore({
     reducer:{
          slice:sliceReducer
     }
})
export default store;