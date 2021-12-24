import { BreadCrumbs } from '../components/BreadCrumbs'

export const PageContainer = ({ children }) => {
  return (
    <>
      <BreadCrumbs />
      {children}
    </>
  )
}
