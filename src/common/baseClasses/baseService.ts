export abstract class BaseService<T> {
    repo: T;

    constructor(
        repo: T,
    ) {
        this.repo = repo;
    }
}