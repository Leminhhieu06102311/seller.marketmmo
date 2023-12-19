export default interface HistoryWidthDraw {
    _id: string;
    receiver: Receiver;
    depositor: Depositor;
    amount: number;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface Receiver {
    bank: string | null;
    _id: string;
    username: string;
    name: string;
}

interface Depositor {
    bank: string | null;
    _id: string;
    username: string;
    name: string;
  }
  