import { BreadCrumbs } from '../components/BreadCrumbs'
import { Page } from '../styles/common'

export const PageContainer = ({ children }) => {
  return (
    <Page>
      <BreadCrumbs />
      {children}
    </Page>
  )
}
