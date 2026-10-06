import React from "react";
import siteConfig from "../data/siteConfig";
import Breadcrumbs from "../components/Breadcrumbs";

/*
 * Original policy terms retained; agency references use René's singular voice.
 * Owner/location wording updated October 6, 2026 at the owner's request.
 */
const sections = [
  [null, ["I’m René Howell, the owner and independent travel agent behind René’s Travel Agency in Delaware. I am committed to ensuring that your private information remains private. I have created this on-line privacy policy so that you can understand my continuing commitment to ensuring that your information remains secure and private. These guidelines have been developed with the recognition that Internet technologies and legislation are rapidly evolving, and that underlying business models are still not established. Accordingly, guidelines are subject to change. Any such changes will be posted on this page."]],
  ["What information does René’s Travel collect from me?", ["I collect information in several ways. When making information requests, I ask you for your name, email address, phone number, address and other relevant information needed to make vacation and travel plans. Like many other commercial web sites, my web site employs a standard technology called a “cookie.”"]],
  ["What is a cookie?", ["A cookie is a small data file that is stored locally on your computer that allows specific information to be saved and retrieved when the site requires it."]],
  ["What is René’s Travel’s cookie policy?", ["In order to provide you with the most efficient service, my website may employ “cookie technology”. Cookies are small pieces of information that are stored by your browser on your computer’s hard drive. Cookies enable sites to recognize repeat visitors and allow a site to track usage behavior and compile aggregate data that assists in content and system enhancements. Cookies are not programs that come onto a user’s system and change or damage files. If a user does not want information collected through the use of cookies, there is a simple procedure in your browser (Netscape or Internet Explorer) to warn you before accepting cookies or to refuse cookies altogether. However, users should note that cookies might be necessary to provide the user with certain customized features available on my site and other websites as well."]],
  ["How does René’s Travel use my information?", [
    "René’s Travel collects information from you to enhance your visit. I am able to provide the requested information promptly and accurately, which makes it easier and more rewarding for you to use my services. Any of the information I collect may be used in one of the following ways:",
    { list: [
      "To personalize your experience (your information helps me to better respond to your individual needs);",
      "To improve my website (I continually strive to improve my website offerings based on the information and feedback I receive from you;",
      "To improve customer service (your information helps me to more effectively respond to your customer service requests and support needs)",
      "To process transactions: Your information, whether public or private, will not be sold, exchanged, transferred, or given to any other company for any reason whatsoever, without you consent, other than for the express purpose of delivering the purchased product or service requested by the customer;",
      "To send periodic emails: The email address you provide for order processing, maybe used to send you information and updates pertaining to your order, in addition to receiving occasional company news, updates, related product to service information etc. NOTE: If at any time you would like to unsubscribe from receiving future emails, I include detailed unsubscribe instructions at the bottom of each email;",
      "To administer a context, promotion, survey or other site feature.",
    ] },
  ]],
  ["How do I protect your information?", ["René’s Travel implements a variety of security measures to maintain the safety of your personal information when I access your information."]],
  ["With whom does René’s Travel share my information?", ["At René’s Travel, when you provide your personal information including name, address, phone number or e-mail address, this information is kept secured and is not divulged to any outside company for use in marketing or solicitation. René’s Travel will not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist me in operating my website, conducting my business, or servicing you, so long as those parties agree to keep this information confidential. I may also release your information when I believe release is appropriate to comply with the law, enforce my site policies, or protect my or others’ rights, property, or safety. However, non-personal identifiable visitor information may be provided to other parties for marketing, advertising, or other uses."]],
  ["What are the security policies of linked third-party sites?", ["This web site may contain links to other web sites. Please note that if you click on one of these links, you are moving to a third-party web site. I encourage you to read the privacy statements of these linked sites as their privacy policy may differ from mine. This privacy statement applies solely to information collected by this web site."]],
  ["Does René’s Travel have a policy regarding the collection of information from children?", ["I am in compliance with the requirements of COPPA (Children’s Online Privacy Protection Act), I do not collect any information from anyone under 13 years of age. My website, products and services are all directed to people who are at least 13 years old or older. René’s Travel does not knowingly collect personal information from children under the age of eighteen (18)."]],
  ["How can you access or update your information?", ["You can correct or update the information I collect at any time by contacting me. To protect your privacy and security, I will take reasonable steps to verify your identity before granting access or making corrections to your information."]],
  ["What else should I know about internet security?", ["Unfortunately, no data transmission over the Internet can be guaranteed to be 100% secure. I strive to protect your personal information. René’s Travel, however, cannot ensure or warrant the security of any information you transmit to me and any information you submit on-line is done voluntarily and at your own risk. Once I receive your transmission, I make my best effort to ensure its security on my systems."]],
  ["Online Privacy Policy only", ["This online privacy policy applies only to information collected through my website and not to information collected offline."]],
  ["Your Consent", ["By using my website, you consent to my Privacy Policy."]],
  ["Changes to my Privacy Policy", ["If I decide to change my privacy policy, I will post those changes on this page."]],
];

export default function PrivacyPolicy() {
  const { contact, privacyPolicy } = siteConfig;
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Privacy policy" }]} />
          <h1 className="h-page">Privacy Policy</h1>
          <p className="lede">Policy updated: {privacyPolicy.updated}.</p>
        </div>
      </header>
      <section className="section">
        <div className="wrap-narrow prose">
          {sections.map(([h, body], i) => (
            <React.Fragment key={i}>
              {h ? <h2>{h}</h2> : null}
              {body.map((b, j) => (b.list ? <ul key={j}>{b.list.map((li) => <li key={li}>{li}</li>)}</ul> : <p key={j}>{b}</p>))}
            </React.Fragment>
          ))}
          <h2>How do I contact René’s Travel?</h2>
          <p>Should you have other questions or concerns about this privacy policy or your electronic records maintained by René’s Travel, please contact me:</p>
          <p>
            {siteConfig.business.name}<br />
            René Howell, Owner &amp; Independent Travel Agent<br />
            Based in {siteConfig.business.state}<br />
            <a className="inline-link" href={`tel:${contact.phoneTel}`}>{contact.phoneDisplay}</a><br />
            <a className="inline-link" href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        </div>
      </section>
    </>
  );
}
