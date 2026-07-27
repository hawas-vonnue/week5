type Route = {
    path: string;
    component: (params?: Record<string, string>) => HTMLElement;
};

function register(routes: Route[], route: Route) {
    routes.push(route);
}

function navigate(
    routes: Route[],
    path: string,
    params?: Record<string, string>
): void {
    console.log(routes);
    console.log(path);
    let route = routes.filter((element) => element.path === path);
    if (route.length === 0) return;
    let element: HTMLElement;
    if (params) element = route[0].component(params);
    else element = route[0].component();
    console.log(element);
}

//-----------------------------------Testing-----------------------------------
let routes: Route[] = [];
let obj = { id: "101" };
function fn(obj?: Record<string, string>): HTMLElement {
    const divElement = document.createElement("div");
    divElement.textContent = "hello ";
    divElement.textContent = divElement.textContent + obj?.id;

    return divElement;
}
register(routes, { path: "/", component: fn });
navigate(routes, "/", obj);
