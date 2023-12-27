import { resend } from '@/app/lib/resend'
import SignInCredentialsEmail from '@/emails/signInCredentialsEmail'



export async function sendVerificationRequest(params: any) {
    const { identifier, url, provider } = params
    const { host } = new URL(url)

    try {
        const data = await resend.emails.send({
            from: 'Project Admin <ProjectAdmin@auth.com>',
            to: [identifier],
            subject: `Log in to ${host}`,
            text: text({ url, host }),
            react: SignInCredentialsEmail(url)
        })
        return { success: true, data }
    } catch (error) {
        throw new Error('Failed to send the verification Email.')
    }
}

function text(params: { url: string; host: string }) {
    const { url, host } = params
    const escapedHost = host.replace(/\./g, '&#8203;.')
    return `Sign in to ${escapedHost}\n${url}\n\n`
}