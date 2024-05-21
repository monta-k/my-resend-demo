interface EmailTemplateProps {
  linkUrl: string
}

export const EmailTemplate = ({ linkUrl }: EmailTemplateProps) => {
  return (
    <div>
      <a href={linkUrl}>Click the link to reset password</a>
    </div>
  )
}
