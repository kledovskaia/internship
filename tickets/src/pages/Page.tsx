import { ReactNode } from 'react';
import {
  Aside, GridContainer, Main, PageContainer,
} from '../styles';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

type Props = {
  header: ReactNode,
  children: ReactNode;
}

export default function Page({ children, header }: Props) {
  return (
    <PageContainer>
      <Aside>
        <Sidebar />
      </Aside>
      <Header>{header}</Header>
      <Main>
        <GridContainer>
          {children}
        </GridContainer>
      </Main>
    </PageContainer>
  );
}
