import { Tabs, Button, TextField } from "polythene-mithril";
import m from "mithril";

const routeData = [
  {
    name: "Home",
    route: "/home",
    tabIndex: 0,
  },
  {
    name: "Search",
    route: "/search",
    tabIndex: 0,
  },
  {
    name: "Matches",
    route: "/matches",
    tabIndex: 1,
  },
  {
    name: "History",
    route: "/history",
    tabIndex: 2,
  }
];

const getTabs = currentRoute => {
  const firstTabRoute = currentRoute === "/"
    ? "/search"
    : "/";
  const selectedIndex = routeData.reduce((acc, d) => (
    d.route === currentRoute
      ? d.tabIndex
      : acc
  ), undefined);
  const tabs = [
    {
      label: "Search",
      element: m.route.Link,
      url: {
        href: firstTabRoute,
        selector: 'a',
      }
    },
    {
      label: "Matches",
      element: m.route.Link,
      url: {
        href: "/matches",
        selector: 'a',
      }
    },
    {
      label: "History",
      element: m.route.Link,
      url: {
        href: "/history",
        selector: 'a',
      }
    }
  ];
  return { tabs, selectedIndex };
}; 

const Navigation = {
  view: () => {
    const currentRoute = m.route.get();
    const { tabs, selectedIndex } = getTabs(currentRoute);
    return m(Tabs, {
      tabs,
      autofit: true,
      activeSelected: true,
      selectedTab: selectedIndex,
    });
  }
};

const App = {
  view: () => [
    m(Navigation),
    m(".tabs-body",
      m("h1", m.route.get()),
      m(TextField, { label: m.route.get(), floatingLabel: true })
    ),
    m("div", routeData.map(({ name, route }) =>
      m(Button, {
        label: name,
        element: m.route.Link,
        url: {
          href: route,
          selector: 'a',
        }
      })
    ))
  ]
};

m.route.prefix = '#';

const routes = routeData.reduce((acc, { route }) => (
  acc[route] = App,
  acc
), {});

m.route(document.body, "/home", routes);
