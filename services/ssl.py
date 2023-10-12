from OpenSSL import crypto, SSL


def cert_gen(
        key_path='/tmp/vkey.key',
        cert_path='/tmp/vcert.crt',
        # emailAddress="emailAddress",
        commonName="commonName",
        # countryName="NT",
        # localityName="localityName",
        # stateOrProvinceName="stateOrProvinceName",
        # organizationName="organizationName",
        # organizationUnitName="organizationUnitName",
        serialNumber=0,
        validityStartInSeconds=0,
        validityEndInSeconds=10 * 365 * 24 * 60 * 60, ):
    # can look at generated file using openssl:
    # openssl x509 -inform pem -in selfsigned.crt -noout -text
    # create a key pair
    k = crypto.PKey()
    k.generate_key(crypto.TYPE_RSA, 4096)
    # create a self-signed cert
    cert = crypto.X509()
    # cert.get_subject().C = countryName
    # cert.get_subject().ST = stateOrProvinceName
    # cert.get_subject().L = localityName
    # cert.get_subject().O = organizationName
    # cert.get_subject().OU = organizationUnitName
    # cert.get_subject().CN = commonName
    # cert.get_subject().emailAddress = emailAddress
    cert.set_serial_number(serialNumber)
    cert.gmtime_adj_notBefore(0)
    cert.gmtime_adj_notAfter(validityEndInSeconds)
    cert.set_issuer(cert.get_subject())
    cert.set_pubkey(k)
    cert.sign(k, 'sha512')

    cert_str = crypto.dump_certificate(crypto.FILETYPE_PEM, cert).decode("utf-8")
    key_str = crypto.dump_privatekey(crypto.FILETYPE_PEM, k).decode("utf-8")

    print(commonName)

    with open(cert_path, "wt") as f:
        f.write(cert_str)

    with open(key_path, "w") as f:
        f.write(key_str)

    return cert_str, key_str
