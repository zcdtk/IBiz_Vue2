interface Observable<T> { };
interface Subject<T> {
    asObservable(): any;
    next(data: any);
    error(data: any);
    subscribe(success?: Function, error?: Function): void;
};
declare var Subject;
declare var rxjs;
declare var Vue;
declare var axios;