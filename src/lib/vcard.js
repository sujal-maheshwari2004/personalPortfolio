import { links } from "@/data";

/** Build + download a vCard (.vcf) entirely client-side — no backend. */
export function downloadVCard() {
  const vcf = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Maheshwari;Sujal;;;",
    "FN:Sujal Maheshwari",
    "TITLE:Full-Stack AI Developer",
    "EMAIL;TYPE=INTERNET:sujalmaheshwari07@gmail.com",
    `URL:${links.portfolio}`,
    `X-SOCIALPROFILE;TYPE=github:${links.github}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${links.linkedin}`,
    "END:VCARD",
  ].join("\r\n");

  const blob = new Blob([vcf], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sujal-maheshwari.vcf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
