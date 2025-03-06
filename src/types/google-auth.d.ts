
interface GoogleAccountsId {
  initialize: (config: any) => void;
  prompt: (callback: (notification: any) => void) => void;
  renderButton: (element: HTMLElement, options: any) => void;
  cancel: () => void;
}

interface GoogleAccounts {
  id: GoogleAccountsId;
}

interface Google {
  accounts: GoogleAccounts;
}

interface Window {
  google?: Google;
}
