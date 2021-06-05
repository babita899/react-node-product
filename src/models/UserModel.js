class UserModel {
  constructor(props) {
    this.initialize(props);
  }

  initialize(props) {
    this.id = props.id;
    this.email = props.email;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.fullName = `${props.firstName} ${props.lastName}`.trim();
    this.emailVerified = props.verifiedEmail;
    this.token = props.token || '';
    this.role = props.role;
  }
}

export default UserModel;
