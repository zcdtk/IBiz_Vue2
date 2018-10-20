// interface Observable<T> {
//     subscribe(success?: Function, error?: Function): void;
// };
// declare type UnaryFunction<T, R> = (source: T) => R;
// declare type OperatorFunction<T, R> = UnaryFunction<Observable<T>, Observable<R>>;
// interface Subject<T> {
//     asObservable(): any;
//     next(data: any);
//     error(data: any);
//     pipe(): Observable<T>;
//     pipe<A>(op1: OperatorFunction<T, A>): Observable<A>;
//     pipe<A, B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): Observable<B>;
//     pipe<A, B, C>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): Observable<C>;
//     pipe<A, B, C, D>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>): Observable<D>;
//     pipe<A, B, C, D, E>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>): Observable<E>;
//     pipe<A, B, C, D, E, F>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>): Observable<F>;
//     pipe<A, B, C, D, E, F, G>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>): Observable<G>;
//     pipe<A, B, C, D, E, F, G, H>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>): Observable<H>;
//     pipe<A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>): Observable<I>;
//     pipe<R>(...operations: OperatorFunction<T, R>[]): Observable<R>;
//     subscribe(success?: Function, error?: Function): void;
// };
// declare var Subject;

interface Observable<T> {
    // inherited from index/Observable
    // static create: Function
    // static if: typeof iif
    // static throw: typeof throwError
    // constructor(subscribe?: (this: Observable<T>, subscriber: Subscriber<T>) => TeardownLogic)
    _isScalar: boolean
    source: Observable<any>
    // operator: Operator<any, T>
    // lift<R>(operator: Operator<T, R>): Observable<R>
    subscribe(observerOrNext?: PartialObserver<T> | ((value: T) => void), error?: (error: any) => void, complete?: () => void): Subscription
    // _trySubscribe(sink: Subscriber<T>): TeardownLogic
    // forEach(next: (value: T) => void, promiseCtor?: PromiseConstructorLike): Promise<void>
    pipe(...operations: OperatorFunction<any, any>[]): Observable<any>
    // toPromise(promiseCtor?: PromiseConstructorLike): Promise<T>
};

declare type UnaryFunction<T, R> = (source: T) => R;
declare type OperatorFunction<T, R> = UnaryFunction<Observable<T>, Observable<R>>;

interface NextObserver<T> {
    closed?: boolean;
    next: (value: T) => void;
    error?: (err: any) => void;
    complete?: () => void;
}
interface ErrorObserver<T> {
    closed?: boolean;
    next?: (value: T) => void;
    error: (err: any) => void;
    complete?: () => void;
}
interface CompletionObserver<T> {
    closed?: boolean;
    next?: (value: T) => void;
    error?: (err: any) => void;
    complete: () => void;
}

declare type PartialObserver<T> = NextObserver<T> | ErrorObserver<T> | CompletionObserver<T>;
declare type Subscription = any;

interface Subject<T> extends Observable<T> {
    // static create: Function
    constructor()
    // observers: Observer<T>[]
    closed: false
    isStopped: false
    hasError: false
    thrownError: any
    // lift<R>(operator: Operator<T, R>): Observable<R>
    next(value?: T)
    error(err: any)
    complete()
    unsubscribe()
    // _trySubscribe(subscriber: Subscriber<T>): TeardownLogic
    // _subscribe(subscriber: Subscriber<T>): Subscription
    asObservable(): Observable<T>
}

declare var rxjs;
declare var Vue;
declare var axios;
declare var IBizEnvironment;
declare var iview;