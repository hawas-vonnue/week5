# Decisions made for TypeScript types

## 1.State

### Type chosen

```interface State {
    route: {
        path: string;
        params: object;
    };
    moviesList: Set<string>;
}
```

### Alternatives considered

#### One

```interface State {
    route: {
        path: string;
        params: object;
    };
    movieChanged:{
        id:number,
        type:"add" | "delete"
    }
    moviesList: Set<string>;
}
```

#### Two

- Simple `object` type.

## 2.types

### Chosen

```
type types = "ROUTE_CHANGED" | "MOVIESLIST_CHANGED" | "ON_LOAD";
```

### Alternatives considered

#### One

- Simple `string` type.

## 3.Payload

### Chosen

- Three different payloads based on the type

- When type is `ROUTE_CHANGED`

```
    interface ParamsInterface {
        imdbID?: string;
    }
    payload: {
        path: string;
        params: ParamsInterface;
    };
```

- When type is `MOVIESLIST_CHANGED`

```
    payload: {
        id: string;
        type: "add" | "delete";
    };
```

- When type is `ON_LOAD`

```
    payload: {
        moviesList: Set<string>;
    };
```

### Alternatives considered

#### One

```
    interface ParamsInterface {
        imdbID?: string;
    }
    payload:{
        path?:string;
        params?:ParamsInterface;
        id?:string;
        type?:"add" | "delete";
        moviesList?: Set<string>
    }
```

#### Two

- A simple `object` type

## 4.Action type

### Chosen

```
type actionInterface = RouteChanged | MovieListChanged | onLoadInterface;

interface RouteChanged {
    type: "ROUTE_CHANGED";
    payload: {
        path: string;
        params: ParamsInterface;
    };
}

interface MovieListChanged {
    type: "MOVIESLIST_CHANGED";
    payload: {
        id: string;
        type: "add" | "delete";
    };
}

interface onLoadInterface {
    type: "ON_LOAD";
    payload: {
        moviesList: Set<string>;
    };
}
```

### Alternatives considered

#### One

```
interface actionInterface{
    type:"ROUTE_CHANGED" | "MOVIELIST_CHANGED" | "ON_LOAD";
    payload:{
        path?:string;
        params?:ParamsInterface;
        id?:string;
        type?:"add" | "delete";
        moviesList?: Set<string>
    }
}
```

#### Two

- Simple `object` type

## 5.Listeners

### Chosen

```
Record<types, ((state: State) => void)[]>
```

### Alternatives considered

#### One

```
Set<(state:State)=> void>
```

#### Two

```
Set<Function>
```

#### Three

```
((state:State)=>void)[]
```

#### Four

```
Function[]
```
