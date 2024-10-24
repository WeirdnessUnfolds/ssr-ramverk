// For email cases
import bcrypt from 'bcryptjs';

function hashPass(password) {
    return bcrypt.hashSync(password, 12);
}

export default hashPass;
