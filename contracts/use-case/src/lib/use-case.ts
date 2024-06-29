export abstract class UseCase<UseCaseResponse, UseCaseProps=undefined> {
  abstract execute(props: UseCaseProps): Promise<UseCaseResponse>;
}
