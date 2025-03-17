
import { Provider } from "react-redux";


import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { ToyIndex } from "./pages/ToyIndex.jsx"
import { ToyDetails } from "./pages/ToyDetails.jsx"
import { ToyEdit } from "./pages/ToyEdit.jsx"
import { store } from "./store/store.js"
// import { Dashboard } from "./pages/Dashboard.jsx"
// import { SurveyIndex } from "./pages/SurveyIndex.jsx"

export function RootCmp() {

    return (
        <Provider store={store}>
            <Router>
                <section className="app main-layout">
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/toy/:toyId" element={<ToyDetails />} />
                            <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
                            <Route path="/toy/edit" element={<ToyEdit />} />
                            <Route path="/toy" element={<ToyIndex />} />
                        </Routes>
                    </main>
                </section>
            </Router>
        </Provider>
    )
}



