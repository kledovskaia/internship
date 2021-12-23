import { BreadCrumbs } from '../components/BreadCrumbs'

export const Page = ({ children }) => {
  return (
    <>
      <BreadCrumbs />
      {children}
    </>
  )
}
