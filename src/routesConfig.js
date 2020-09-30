import Home from "./views/js/home";
import Comics from "./views/js/comics"
import Characters from "./views/js/characters"

const routesConfig = [
    {
        path: "/",
        component: Home,
        exact: true
    },
    {
        path: "/home",
        component: Home,
        exact: true
    },
    {
        path: "/comics",
        component: Comics,
        exact: true
    },
    {
        path: "/characters",
        component: Characters,
        exact: true
    },
]

export default routesConfig