interface Observable<T> { 
    subscribe(success?: Function, error?: Function): void;
 };
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
declare var IBizEnvironment;