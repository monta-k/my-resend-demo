interface EmailTemplateProps {
  email: string
  linkUrl: string
}

export const EmailTemplate = ({ email, linkUrl }: EmailTemplateProps) => {
  return (
    <div>
      <a href={linkUrl}>Click the link to sign up</a>
    </div>
  )
}
