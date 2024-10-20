export type Invitation = {
  uuid: string;
  name: string;
  email: string;
  guest_number: number;
  status: 'accepted' | 'declined' | 'none';
};
