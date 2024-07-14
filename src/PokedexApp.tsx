import 'react-native-gesture-handler';
import { StackNavigator } from './presentation/navigator/StackNavigator';
import { ThemeContextProvider } from './presentation/context/ThemeContex';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NativeBaseProvider } from 'native-base';

const queryClient = new QueryClient();

export const PokedexApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <NativeBaseProvider>
          <StackNavigator />
        </NativeBaseProvider>
      </ThemeContextProvider>
    </QueryClientProvider>
  );
};
