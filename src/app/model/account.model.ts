export interface AccountDetails {
  accountID:            string;
  balance:              number;
  currentPage:          number;
  totalPages:           number;
  pageSize:             number;
  accountOperationsDTO: AccountOperations[];
}

export interface AccountOperations {
  id:            number;
  operationDate: Date;
  amount:        number;
  type:          string;
  description:   string;
}
