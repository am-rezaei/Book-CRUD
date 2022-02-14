import './style.scss';
import Main from './pages/Main'
import Detail from "./pages/Detail";
import NotFound from "./pages/NotFound";
import {
    BrowserRouter,
    Routes,
    Route, Switch
} from "react-router-dom";
import {useEffect, useState} from "react";
import {pingServer} from "./api/apis";

function App() {

    const [connectivityState, setConnectivityState] = useState(true)

    useEffect(() => {
        const timer = setInterval(() => {
                pingServer((state, response) => {
                    let connectivity = -1;
                    if (state) {
                        if (response.state === 'ok') {
                            connectivity = 1;
                        }
                    }
                    setConnectivityState(connectivity === 1 ? true : false);
                })

        }, 5000);
        return () => clearTimeout(timer);
    }, [])

    return (
        <div className="app">
            {connectivityState && <div className="success">
                SERVER CONNECTED
            </div>}
            {!connectivityState && <div className="error">
                CONNECTION PROBLEM
            </div>}

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/create" element={<Detail createNew/>}/>
                    <Route path="/edit/:id" element={<Detail/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
