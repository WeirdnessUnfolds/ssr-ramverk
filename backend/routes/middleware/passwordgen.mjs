import Generator from 'generate-password';

function generatePassword() {
    var password = Generator.generate({
        length: 10,
        numbers: true
    });

    return password;
}
export default generatePassword;
