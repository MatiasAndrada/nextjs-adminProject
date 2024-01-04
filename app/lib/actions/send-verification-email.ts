import { createTransport } from "nodemailer"

interface Theme {
    brandColor?: string
    background?: string
    buttonText?: string
    text?: string
    heading?: string
}


export async function sendVerificationRequest(params: { identifier: string; url: string; provider: any; theme?: Theme }) {
    const { identifier, url, provider, theme } = params
    console.log("🦇 ~ file: send-verification-email.ts:14 ~ sendVerificationRequest ~ params:", params)

    const { host } = new URL(url)
    console.log("🦇 ~ file: send-verification-email.ts:17 ~ sendVerificationRequest ~ host:", host)
    // NOTE: You are not required to use `nodemailer`, use whatever you want.
    console.log("transport 0")
    const transport = createTransport(provider)
    console.log("🦇 ~ transport:", transport)
    console.log("transport 1")
    const result = await transport.sendMail({
        to: identifier,
        from: provider.from,
        subject: `Sign in to ${host}`,
        text: text({ url, host }),
        html: html({
            url, host, theme: theme || {
                brandColor: "#000",
                background: "#fff",
                buttonText: "#000",
                text: "#000",
                heading: "#000"
            }
        }),
    })
    console.log("result")
    console.log("🦇 ~ file: send-verification-email.ts:35 ~ sendVerificationRequest ~ result:", result)

    const failed = result.rejected.concat(result.pending).filter(Boolean)
    console.log("🦇 ~ file: send-verification-email.ts:39 ~ sendVerificationRequest ~ failed:", failed)
    if (failed.length) {
        throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
    }

    function html(params: { url: string; host: string; theme: Theme }) {
        console.log("function html")
        const { url, host, theme } = params

        const escapedHost = host.replace(/\./g, "&#8203;.")
        console.log("🦇 ~ file: send-verification-email.ts:44 ~ html ~ escapedHost:", escapedHost)

        const brandColor = theme.brandColor || "#346df1"
        const color = {
            background: "#f9f9f9",
            text: "#444",
            mainBackground: "#fff",
            buttonBackground: brandColor,
            buttonBorder: brandColor,
            buttonText: theme.buttonText || "#fff",
        }

        return `
    <body style="background: ${color.background};">
        <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
            <tr>
                <td align="center" style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
                    Sign in to <strong>${escapedHost}</strong>
                </td>
            </tr>
            <tr>
                <td align="center" style="padding: 20px 0;">
                    <table border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}">
                                <a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign in</a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
                    If you did not request this email you can safely ignore it.
                </td>
            </tr>
        </table>
    </body>
    `;
    }
}


// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: { url: string; host: string }) {
    return `Sign in to ${host}\n${url}\n\n`
}