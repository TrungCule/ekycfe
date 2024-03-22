import { ConfigProvider } from 'antd';
import theme from '@/configs/antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'antd/dist/reset.css';
import 'react-quill/dist/quill.snow.css';
import '@/styles/globals.scss';
import ErrorBoundary from '@/components/ErrorBoundary';
import Header from '@/layouts/default/header';
import Navbar from '@/layouts/default/navbar';
import DefaultLayout from '@/layouts/default';
import { store } from '@/store/index';
import { Provider } from 'react-redux';
import '../modules/users/user.css';
import Author from '@/components/auth/Author';
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <div className="flex flex-col overflow-x-hidden max-h-[100vh]">
              <main className="flex-1 flex flex-col overflow-y-hidden">
                {/* <Header>
                  <Navbar />
                </Header> */}
                <DefaultLayout>
                  <Author renderContent={<Component {...pageProps} />} />
                  {/* <Componesnt {...pageProps} /> */}
                </DefaultLayout> 
              </main>
            </div>
          </ErrorBoundary>
        </QueryClientProvider>
      </ConfigProvider>
    </Provider>
  );
}
