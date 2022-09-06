import { createContext, Dispatch, SetStateAction } from 'react'

export interface LoadingContextInterface {
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>
}

export default createContext<LoadingContextInterface>({
  loading: false,
  setLoading: () => {}
})
