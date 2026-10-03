"""Rebuild client forms and add enlarged, lossless-content reading panels to supplier PDFs.
Requires source PDFs in the directory passed as argument. Originals are retained as page images.
"""
from pathlib import Path
import sys, re, io, json
from xml.sax.saxutils import escape
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
pdfmetrics.registerFont(TTFont("AgencySans", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("AgencySansBold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Flowable, PageBreak
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor, white
from reportlab.lib.utils import ImageReader
from PIL import Image
from pypdf import PdfReader

ROOT=Path(__file__).resolve().parents[1]
SOURCE=Path(sys.argv[1])
RENDER=Path(sys.argv[2])
OUT=ROOT/'public/pdf'
NAVY=HexColor('#062D50'); BLUE=HexColor('#075D9C'); PALE=HexColor('#E3F1F8'); INK=HexColor('#173B54')
body=ParagraphStyle('body',fontName='AgencySans',fontSize=11,leading=16,textColor=INK,spaceAfter=10)
heading=ParagraphStyle('heading',parent=body,fontName='AgencySansBold',fontSize=15,leading=20,textColor=BLUE,spaceBefore=12,spaceAfter=10)
title=ParagraphStyle('title',parent=heading,fontSize=25,leading=29,spaceBefore=20,spaceAfter=16)
small=ParagraphStyle('small',parent=body,fontSize=9,leading=13)
manifest=[]

class Field(Flowable):
 def __init__(self,label,name,width=240,height=44):
  super().__init__();self.label=label;self.name=name;self.width=width;self.height=height
 def draw(self):
  c=self.canv
  label_style=ParagraphStyle('field-label',fontName='AgencySans',fontSize=8.5,leading=10,textColor=INK)
  label=Paragraph(escape(self.label),label_style);_,lh=label.wrap(self.width,30)
  label.drawOn(c,0,self.height-lh-1)
  c.acroForm.textfield(name=self.name,tooltip=self.label,x=0,y=2,width=self.width,height=self.height-21,fontName='Helvetica',fontSize=11,borderColor=HexColor('#8CAFC5'),fillColor=white,textColor=INK,borderWidth=.7,forceBorder=True,relative=True)

def fields(story,*labels):
 cells=[Field(label,'field_'+str(len(story))+'_'+str(i),240) for i,label in enumerate(labels)]
 for start in range(0,len(cells),2):
  row=cells[start:start+2]
  if len(row)==1: row.append('')
  t=Table([row],colWidths=[260,260]);t.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),12)]));story.append(t)

def p(story,text,style=body):story.append(Paragraph(escape(text),style))
def h(story,text):p(story,text,heading)
def decorate(c,doc):
 c.saveState();w,hp=doc.pagesize;c.setFillColor(NAVY);c.rect(0,hp-68,w,68,fill=1,stroke=0);c.setFillColor(white);c.setFont('AgencySansBold',13);c.drawString(46,hp-31,"René's Travel Agency, LLC");c.setFont('AgencySans',9);c.drawString(46,hp-48,'René Howell | Owner & Independent Travel Agent')
 c.setStrokeColor(HexColor('#B7CDDB'));c.line(46,44,w-46,44);c.setFillColor(INK);c.setFont('AgencySans',8);c.drawString(46,30,'(609) 304-1530  |  renes.travel@comcast.net');c.drawRightString(w-46,30,f'Page {doc.page}');c.restoreState()

def original(story,name):
 r=PdfReader(SOURCE/name)
 story.append(PageBreak());h(story,'Original document - reference copy')
 p(story,'The original pages follow, preserving all source wording, figures, artwork and terms. Contact details on these historical pages may differ from the current agency contact details above.',small)
 for i in range(len(r.pages)):
  if i:story.append(PageBreak())
  im=Image.open(RENDER/(Path(name).stem+f'-{i+1}.png')).convert('RGB');buf=io.BytesIO();im.save(buf,format='JPEG',quality=78)
  from reportlab.platypus import Image as RLImage
  available=490 if i==0 else 630;scale=min(520/im.width,available/im.height);story.append(RLImage(buf,width=im.width*scale,height=im.height*scale))

def save_form(name,label,story):
 original(story,name);dest=OUT/name;dest.parent.mkdir(parents=True,exist_ok=True)
 SimpleDocTemplate(str(dest),pagesize=(612,792),leftMargin=46,rightMargin=46,topMargin=92,bottomMargin=58,title=label,author="René's Travel Agency, LLC").build(story,onFirstPage=decorate,onLaterPages=decorate)
 r=PdfReader(dest);manifest.append({'path':'public/pdf/'+name,'title':label,'kind':'fillable form','pages':len(r.pages),'fields':len(r.get_fields() or {})})

def start(label,instruction):
 s=[];p(s,label,title);p(s,instruction);return s

s=start('Travel Booking Worksheet','Please write clearly or type your information. Booking Agency: René’s Travel Agency.')
p(s,'The Transportation Security Administration (TSA) requires our customers to provide their full name, date of birth and gender when round-trip airline tickets are added to your vacation package.')
fields(s,"Today's Date",'Travel Date','Trip Name','Hotel/Resort Name')
h(s,'Travelers')
for i in range(1,5):fields(s,f'Traveler {i}: Full Legal Name and Gender',f'Traveler {i}: Date of Birth')
h(s,'Contact information');fields(s,'Address','City, State, Zip','Home Phone','Office Phone','Mobile Phone','Alternate Phone','E-Mail','Citizenship')
h(s,'Travel arrangements');fields(s,'Passports Required: Yes / No','For whom')
p(s,'Each Traveler - Unless you are traveling inside the United States.')
fields(s,'Travel Insurance: Include / Decline')
p(s,'Include - Click Here to Protect Your Vacation. Decline - (A signed decline waiver form will be required at booking if you opt out to purchase travel insurance)')
s.append(Paragraph('<a href="http://www.travelguard.com/agentlink.asp?ta_arc=00438510&amp;pcode=PAA&amp;agencyemail=renes.travel@comcast.net" color="#075D9C">Click Here to Protect Your Vacation</a>',body))
h(s,'Emergency contact');fields(s,'Name','Phone Number','Relationship to you','Special Request/Needs (Need to know ASAP)')
fields(s,'Room Selection: Single / Double / Triple / Quad')
p(s,'Room Selection: Circle 1: Single Person, Double Occupancy, Triple Occupancy, Quad Occupancy.')
p(s,'Please email or fax form to: PO Box 83600 | Conyers, GA 30013 | 770-918-9284 fax | Renes.Travel@Comcast.Net | www.Renestravelagency.com',small)
save_form('Travel_Booking_Worksheet.pdf','Travel Booking Worksheet',s)

s=start('Cruise Registration Form','Complete attached CC/Check or Debit Card Authorization form for payments. Form Must Be signed by Each Participating Adult.')
fields(s,'Name','DOB','Gender','Address','City','State','Zip','Home #','Cell #','Email')
h(s,'Stateroom selection');fields(s,'Interior / Oceanview / Balcony / Suite')
p(s,'PLEASE CHECK BOX TO INDICATE STATEROOM SELECTION: Interior Stateroom, Oceanview Stateroom, Balcony Stateroom, Suite. ALL FARES ARE BASED ON DOUBLE OCCUPANCY.')
p(s,'I have read General Terms and Conditions set forth in this brochure and accept the risks therein.')
fields(s,'Signature (sign by hand)','Date','Final payment due on or before')
h(s,'General terms and conditions')
text=(SOURCE/'Rene_Travel_Cruise_Info.txt').read_text();text=' '.join(text.split());term=text[text.index('TRAVEL DOCUMENTS'):text.index('Mail / Fax')]
for part in re.split(r'(?=(?:TRAVEL DOCUMENTS|PAYMENTS|CANCELLATIONS|BAGGAGE|INSURANCE|RESPONSIBILITY):?)',term):
 if part.strip():p(s,part.strip())
p(s,'Mail / Fax CC Authorization & Registration Form. Make checks payable to: René’s Travel Agency, LLC. P.O. Box 83600, Conyers, GA 30013. FAX (770) 918-9284. Renes.Travel@Comcast.Net. Visit us on our Website www.Renestravelagency.com.')
p(s,'By signing this form you are agreeing with this policy.')
save_form('Rene_Travel_Cruise_Info.pdf','Cruise Registration Form',s)

s=start('One-Time Credit Card Payment Authorization','Sign and complete this form to authorize René’s Travel Agency to make a one-time debit to your credit card listed below.')
p(s,'By signing this form you give us permission to debit your account for the amount indicated on or after the indicated date. This is permission for a single transaction only, and does not provide authorization for any additional unrelated debits or credits to your account.')
h(s,'Payment authorization');fields(s,'Full name','Amount','On or after (date)','Description of services')
p(s,'I authorize René’s Travel Agency to charge my credit card account indicated below for the amount and on or after the date indicated above. This payment is for the description of services above.')
h(s,'Billing information');fields(s,'Billing Address','City, State, Zip','Phone #','Email')
h(s,'Card information');fields(s,'Account Type: Visa / MasterCard / AMEX / Discover','Cardholder Name','Account Number','Expiration Date')
h(s,'Authorization and signature')
text=' '.join((SOURCE/'Auth_Form-one-time-payment.txt').read_text().split());p(s,text[text.index('I authorize the above named business'):].replace('\t',' '))
fields(s,'SIGNATURE (sign by hand)','DATE')
save_form('Auth_Form-one-time-payment.pdf','One-Time Credit Card Payment Authorization',s)

s=start('Recurring Credit Card Payment Authorization','Schedule your payments to be automatically charged to your credit card. Just complete and sign this form.')
h(s,'Here’s How Recurring Payments Work')
text=' '.join((SOURCE/'Recurring_Auth_Form.txt').read_text().split());p(s,text[text.index('You authorize René'):text.index('Please complete')])
h(s,'Payment schedule');fields(s,'Full name','Day or date of charge','Frequency','Description of services','Advance notice if charge exceeds ($)')
p(s,'I authorize René’s Travel Agency to charge my credit card indicated below on the day or date of each frequency indicated above, for payment of the description of services. I understand that I will only receive advance notice of the charge if it exceeds the amount indicated above.')
h(s,'Billing information');fields(s,'Billing Address','City, State, Zip','Phone #','Email')
h(s,'Card information');fields(s,'Account Type: Visa / MasterCard / Amex / Discover','Cardholder Name','Account Number','Expiration Date','CVV')
p(s,'CVV (3 digit number on back of Visa/MC, 4 digits on front of AMEX).',small)
h(s,'Authorization and signature');p(s,text[text.index('I authorize the above named business'):]);fields(s,'SIGNATURE (sign by hand)','DATE')
save_form('Recurring_Auth_Form.pdf','Recurring Credit Card Payment Authorization',s)

s=start('Online Check-In Information','René’s Travel Agency')
h(s,'Traveler information');fields(s,'First Name','Middle Name','Last Name','Crown Anchor #','Country of Birthplace','Country','Gender: Male / Female','Marital Status','DOB')
h(s,'Residence');fields(s,'Country','Address (include apartment #)','City','State','Zip Code','Primary Phone #','Cell #','Email Address')
h(s,'Contact numbers');fields(s,'Contact number of traveler','Emergency Contact Person','Phone #')
h(s,'Document type');fields(s,'Passport or Passport Card','Passport or Passport Card #','Expiration Date','Birth Certificate: Birth Place','Birth Certificate: State')
h(s,'Government issue ID');fields(s,'Driver’s License / Military ID / Student ID / State ID','State Government ID Issued from')
p(s,'IMPORTANT NOTE: IF YOU’RE MARRIED OR HAVE BEEN MARRIED AND YOU’RE USING YOUR BIRTH CERTIFCATE. YOU MUST ALSO PROVIDE YOUR MARRIAGE CERTITICATE AT THE PORT WHEN CHECKING IN.')
fields(s,'On Board Expense Account: Cash / Credit Card / Travelers Checks')
p(s,'ON BOARD EXPENSE ACCOUNT: CASH, CREDIT CARD OR TRAVELERS CHECKS')
save_form('ON_LINE_CHECK_IN_FORM.pdf','Online Check-In Information',s)

# Supplier pages: enlarged panels preserve tables, images and exact printed terms.
# Every source page is also included whole, so nothing is lost at a panel boundary.
names={
 'airline.pdf':'Guide to Airline Fees',
 'gold_silv_plat.pdf':'Travel Guard: Gold, Silver & Platinum',
 'Carnival_Cruise_flyer.pdf':'Carnival Sunshine: 2017 Cruise Flyer',
 'Flyer_Azamara.pdf':'Azamara: 2016 Book. Pay. Save.',
 'amtrak/top_selling_rail_vacation.pdf':'Top Selling Rail Vacations',
 'amtrak/top_selling_rail_vacationB.pdf':'Top Selling Rail Vacations: Part B',
 'amtrak/us_national_parks.pdf':'Discover the U.S. National Parks',
 'amtrak/us_national_parksB.pdf':'Discover the U.S. National Parks: Part B'}

def image_bytes(im):
 b=io.BytesIO();im.convert('RGB').save(b,format='JPEG',quality=78,optimize=True);b.seek(0);return ImageReader(b)
def frame(c,label,number,landscape=False):
 w,hp=(792,612) if landscape else (612,792)
 c.setFillColor(NAVY);c.rect(0,hp-62,w,62,fill=1,stroke=0);c.setFillColor(white);c.setFont('AgencySansBold',13);c.drawString(36,hp-28,"René's Travel Agency");c.setFont('AgencySans',9);c.drawString(36,hp-45,label)
 c.setFillColor(INK);c.setFont('AgencySans',8);c.drawString(36,24,'(609) 304-1530 | renes.travel@comcast.net');c.drawRightString(w-36,24,f'{number}')

def place(c,im,box):
 x,y,w,hp=box;scale=min(w/im.width,hp/im.height);iw=im.width*scale;ih=im.height*scale;c.drawImage(image_bytes(im),x+(w-iw)/2,y+(hp-ih)/2,width=iw,height=ih)

rail=[
 ('California Coast','San Francisco > Paso Robles > Los Angeles > San Diego','9 Days from $1,749',['Enjoy a day of sightseeing on a hop-on / hop-off tour of San Francisco','Tour the award-winning wineries of California’s Central Coast in Paso Robles','Explore Los Angeles on a hop-on / hop-off tour','Enjoy a sightseeing harbor cruise of the San Diego Bay']),
 ('Pacific Northwest','San Francisco > Portland > Seattle','8 Days from $1,299',['Experience San Francisco city tour on a hop-on / hop-off bus','Visit Muir Woods and Sausalito Tour in San Francisco','Explore 2-day hop-on / hop-off trolley tour in Portland','Guided city tour of Seattle']),
 ('Riverwalk to the French Quarter','San Antonio > New Orleans','7 Days from $1,149',['Visit the Alamo on a grand tour of San Antonio, including a riverboat cruise and museum admission','Enjoy a narrated view of New Orleans on a tour of this historic city','Hit the French Quarter for a four-course jazz dinner at the world-famous Court of Two Sisters*']),
 ('American Heritage','Boston > New York City > Philadelphia > Washington, DC','10 Days from $1,849',['Journey to the top of The Empire State Building or appreciate the cultural delights of The Guggenheim in New York','Hop on and off your sightseeing tours of Boston, New York City and Washington, DC','Enjoy dinners in Boston & New York City at popular restaurants']),
 ('Jazz Blues and Rock ‘n’ Roll','Chicago > Memphis > New Orleans','9 Days from $1,499',['Explore Chicago on a hop-on / hop-off sightseeing tour','Enjoy Memphis on a platinum tour including Graceland®','Savor New Orleans with brunch at The Court of Two Sisters','Battlefield Cruise in New Orleans aboard a paddlewheel boat'])]
parks=[
 ('Glacier National Park Express','Chicago > Glacier National Park > Seattle','10 Days from $1,999',['Sightseeing architecture cruise of Chicago Harbor','Glacier Park Two Medicine Valley Boat Cruise','Tour Glacier National Park on a Big Sky Circle Tour','Seattle’s Space Needle and Chihuly Garden & Glass Exhibit']),
 ('Rails to the Canyon','Los Angeles > Williams > Grand Canyon > Los Angeles','5 Days from $899',['Fuel up for the day with breakfast in Williams','Ride from Williams to Grand Canyon and back aboard the Grand Canyon Railway','Grand Canyon Motorcoach Rim tour with lunch','Dinner in Williams']),
 ('Yosemite National Park Getaway','Yosemite National Park','3 Days from $249',['2 nights’ hotel accommodations','Yosemite Valley Floor Tour']),
 ('Grand Canyon Explorer','Albuquerque > Santa Fe > Williams > Grand Canyon > Flagstaff','9 Days from $1,499',['Walking tour of Santa Fe','One-way aboard Grand Canyon Railway to the Grand Canyon','Grand Canyon Motorcoach Rim tour with lunch','Guided jeep tour in Sedona']),
 ('Niagara Falls Getaway','Niagara Falls','3 Days from $129',['2 nights’ hotel accommodations','Skylon Tower Observatory Admission','Choice of Voyage to the Falls Boat Ride, Journey Behind the Falls, Niagara’s Fury, OR IMAX Theatre Niagara Falls - Movie & Museum Admission'])]
for name,label in names.items():
 if name.startswith('amtrak/'):
  story=start(label,'Amtrak Vacations | Original itineraries and printed prices retained.')
  p(story,'Historical document: ask René for current options.',small)
  for index,(trip,route,price,bullets) in enumerate(parks if 'national_parks' in name else rail):
   if index in [2,4]:story.append(PageBreak())
   h(story,trip);p(story,route);p(story,price,heading)
   for bullet in bullets:p(story,'• '+bullet)
  p(story,'To Book a Reservation Today, call René’s Travel Agency. renes.travel@comcast.net | (609) 304-1530.')
  if name.endswith('B.pdf'):p(story,'or visit our website at AmtrakVacations.com')
  save_form(name,label,story);manifest[-1]['kind']='modern readable flyer with original pages';continue
 if name=='Carnival_Cruise_flyer.pdf':
  story=start('Fun in the Sun','On The Fabulous Carnival’s Sunshine Cruise Line')
  h(story,'8-Day Eastern Caribbean');p(story,'July 10-18, 2017 | Depart: New York, NY');p(story,'Ports of call: San Juan, St. Thomas, Grand Turk')
  h(story,'Interior Cabin (4E) - Deck 6 & 7');p(story,'$1,234.05 PP DBL',heading)
  p(story,'Price Includes: Cruise, Taxes, Port Charges, Accommodations, Meals & Entertainment')
  h(story,'To reserve your cabin');p(story,'$50.00 PP Deposit Due NOW!');p(story,'$200.00 PP Deposit Due July 9, 2016');p(story,'Final payment due on or before April 16, 2017');p(story,'Monthly payments encouraged')
  p(story,'Make checks or money orders payable to: René’s Travel Agency')
  p(story,'PO Box 83600 | Conyers, GA 30013 | 770-918-9284 fax | Renes.Travel@Comcast.Net | www.Renestravelagency.com',small)
  p(story,'Historical cruise flyer: original 2017 dates and offer preserved.',small)
  save_form(name,label,story);manifest[-1]['kind']='modern readable flyer with original pages';continue
 dest=OUT/name;dest.parent.mkdir(parents=True,exist_ok=True);c=canvas.Canvas(str(dest),pagesize=(612,792),pageCompression=1);c.setTitle(label);c.setAuthor("René's Travel Agency, LLC");n=1
 frame(c,'Travel documents',n);c.bookmarkPage('overview');c.addOutlineEntry('Overview','overview',0)
 yy=675
 for line in [label,'Larger reading edition']:
  para=Paragraph(escape(line),title if line==label else heading);_,ph=para.wrap(540,200);para.drawOn(c,36,yy-ph);yy-=ph+18
 intro='The following pages enlarge the source document for easier reading. Original wording, prices, dates, tables and supplier terms are preserved. The complete original pages are included at the end for reference.'
 para=Paragraph(intro,body);_,ph=para.wrap(540,300);para.drawOn(c,36,yy-ph);yy-=ph+22
 if name in ['airline.pdf','Carnival_Cruise_flyer.pdf','Flyer_Azamara.pdf'] or name.startswith('amtrak/'):
  para=Paragraph('Historical document: printed offers, fees and travel dates are retained as originally published. Ask René for current options.',body);_,ph=para.wrap(540,200);para.drawOn(c,36,yy-ph)
 c.showPage()
 reader=PdfReader(SOURCE/name)
 for i in range(len(reader.pages)):
  im=Image.open(RENDER/(Path(name).stem+f'-{i+1}.png')).convert('RGB');w,hp=im.size
  # Crop along the supplier's column boundaries, keeping unrelated columns out.
  if name=='gold_silv_plat.pdf' and i%2==0:
   fractions=[(.02,.02,.98,.23),(.02,.23,.36,.89),(.375,.23,.67,.51),(.68,.23,.98,.51),(.365,.515,.98,.89),(.02,.89,.98,.99)]
  elif name=='gold_silv_plat.pdf':
   fractions=[(.02,.03,.50,.53),(.50,.03,.98,.53),(.02,.47,.50,.99),(.50,.47,.98,.99)]
  elif name=='Flyer_Azamara.pdf' and i==0:
   fractions=[(.02,.02,.98,.45),(.02,.45,.55,.73),(.55,.45,.98,.73),(.02,.73,.98,.98)]
  elif name=='Flyer_Azamara.pdf':
   fractions=[(.02,.02,.98,.27),(.02,.27,.98,.57),(.02,.57,.98,.82),(.02,.82,.98,.99)]
  else:
   fractions=[(0,0,1,.30),(0,.24,1,.53),(0,.47,1,.78),(0,.72,1,1)]
  boxes=[tuple(int(v*(w if k%2==0 else hp)) for k,v in enumerate(box)) for box in fractions]
  for j,box in enumerate(boxes):
   n+=1; panel=im.crop(box); landscape=panel.width/panel.height>1.45; c.setPageSize((792,612) if landscape else (612,792)); frame(c,label,n,landscape);key=f'reading-{i}-{j}';c.bookmarkPage(key);c.addOutlineEntry(f'Source page {i+1} - reading panel {j+1}',key,0)
   c.setFillColor(BLUE);c.setFont('AgencySansBold',10);c.drawString(36,528 if landscape else 708,f'SOURCE PAGE {i+1} / PANEL {j+1}');place(c,panel,(36,55,720,455) if landscape else (36,55,540,630));c.showPage()
 for i in range(len(reader.pages)):
  n+=1;c.setPageSize((612,792));frame(c,label,n);key=f'original-{i}';c.bookmarkPage(key);c.addOutlineEntry(f'Original source page {i+1}',key,0)
  c.setFillColor(BLUE);c.setFont('AgencySansBold',10);c.drawString(36,708,f'ORIGINAL SOURCE PAGE {i+1}');im=Image.open(RENDER/(Path(name).stem+f'-{i+1}.png'));place(c,im,(36,55,540,630));c.showPage()
 c.save();manifest.append({'path':'public/pdf/'+name,'title':label,'kind':'enlarged reading edition with original pages','pages':len(PdfReader(dest).pages),'fields':0})
(ROOT/'docs/DOCUMENT_REFRESH.json').write_text(json.dumps(manifest,indent=2))
print(json.dumps(manifest,indent=2))
