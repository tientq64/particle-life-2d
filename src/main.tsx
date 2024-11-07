import { App as AntdApp, ConfigProvider, theme, ThemeConfig } from 'antd'
import { createRoot } from 'react-dom/client'
import { App } from './components/App'
import './style.scss'

const darkTheme: ThemeConfig = {
	algorithm: theme.darkAlgorithm,
	token: {
		fontFamily: 'Arial, sans-serif',
		marginLG: 8,
		motion: false
	}
}

createRoot(document.getElementById('root')!).render(
	<ConfigProvider theme={darkTheme}>
		<AntdApp>
			<App />
		</AntdApp>
	</ConfigProvider>
)
