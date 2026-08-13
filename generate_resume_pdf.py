# generate_resume_pdf.py
# Clean pure-Python single-page PDF generator for Shubham's Resume

def create_resume_pdf(filename="public/resume.pdf"):
    # PDF dimensions (Letter / A4: 595 x 842 pt)
    w, h = 595, 842
    
    # We will build PDF stream with clean text positioning
    lines = []
    
    # Header
    lines.append(("Helvetica-Bold", 22, 50, 780, "SHUBHAM"))
    lines.append(("Helvetica", 10, 50, 762, "Shubhamshivi2004@gmail.com   |   linkedin.com/in/shubhamverma2221   |   github.com/Shubhamverma2221   |   leetcode.com/u/Shubhamverma2221"))
    
    # Section helper
    y = 735
    
    def section_header(title, cur_y):
        lines.append(("Helvetica-Bold", 12, 50, cur_y, title.upper()))
        return cur_y - 18
    
    # Education
    y = section_header("Education", y)
    lines.append(("Helvetica-Bold", 10.5, 50, y, "DIT University, Dehradun, Uttarakhand"))
    lines.append(("Helvetica-Oblique", 9.5, 450, y, "2023 - 2027"))
    y -= 14
    lines.append(("Helvetica", 10, 50, y, "Bachelor of Technology in Computer Science Engineering  --  CGPA: 7.80/10"))
    y -= 24
    
    # Projects
    y = section_header("Projects", y)
    
    # Project 1
    lines.append(("Helvetica-Bold", 10.5, 50, y, "StayEase - Airbnb Clone"))
    lines.append(("Helvetica-Oblique", 9.5, 420, y, "React, Node, Express, MongoDB"))
    y -= 13
    lines.append(("Helvetica", 9.5, 60, y, "* Developed a full-stack Airbnb-inspired accommodation booking web application using the MERN stack."))
    y -= 12
    lines.append(("Helvetica", 9.5, 60, y, "* Implemented secure JWT user authentication, property listing management, booking system, and dynamic search."))
    y -= 12
    lines.append(("Helvetica", 9.5, 60, y, "* Built responsive user interfaces for guests and hosts using React.js and integrated MongoDB REST APIs."))
    y -= 12
    lines.append(("Helvetica", 9.5, 60, y, "* Designed scalable booking and property browsing workflows for an enhanced user experience."))
    y -= 20
    
    # Project 2
    lines.append(("Helvetica-Bold", 10.5, 50, y, "AI Expense Tracker & Predictor"))
    lines.append(("Helvetica-Oblique", 9.5, 430, y, "Python, Machine Learning, JS, HTML/CSS"))
    y -= 13
    lines.append(("Helvetica", 9.5, 60, y, "* Developed a web-based smart expense tracking application with an interactive and responsive dashboard."))
    y -= 12
    lines.append(("Helvetica", 9.5, 60, y, "* Implemented automated expense categorization, transaction management, and predictive budget forecasting."))
    y -= 12
    lines.append(("Helvetica", 9.5, 60, y, "* Built CRUD functionality for adding, updating, deleting, and visualizing daily and monthly expenditures."))
    y -= 20
    
    # Technical Skills
    y = section_header("Technical Skills", y)
    lines.append(("Helvetica-Bold", 9.5, 50, y, "Languages:"))
    lines.append(("Helvetica", 9.5, 120, y, "Java, C, Python, SQL, JavaScript, TypeScript"))
    y -= 13
    lines.append(("Helvetica-Bold", 9.5, 50, y, "Frontend:"))
    lines.append(("Helvetica", 9.5, 120, y, "HTML5, CSS3, JavaScript, React.js, Vite, Tailwind CSS"))
    y -= 13
    lines.append(("Helvetica-Bold", 9.5, 50, y, "Backend:"))
    lines.append(("Helvetica", 9.5, 120, y, "Node.js, Express.js, MongoDB, MySQL, REST APIs"))
    y -= 13
    lines.append(("Helvetica-Bold", 9.5, 50, y, "Tools & Platforms:"))
    lines.append(("Helvetica", 9.5, 150, y, "Git, GitHub, VS Code, Docker, Linux"))
    y -= 13
    lines.append(("Helvetica-Bold", 9.5, 50, y, "Coursework:"))
    lines.append(("Helvetica", 9.5, 120, y, "Data Structures & Algorithms, Object-Oriented Programming, DBMS, Computer Networks"))
    y -= 22
    
    # Experience
    y = section_header("Experience", y)
    lines.append(("Helvetica-Bold", 10.5, 50, y, "Acmegrade Pvt. Ltd."))
    lines.append(("Helvetica-Oblique", 9.5, 430, y, "Jun 2025 - Aug 2025"))
    y -= 14
    lines.append(("Helvetica-Bold", 9.5, 50, y, "Cyber Security Intern"))
    y -= 13
    lines.append(("Helvetica", 9.5, 60, y, "* Completed a two-month Cyber Security internship focusing on threat analysis and risk management."))
    y -= 12
    lines.append(("Helvetica", 9.5, 60, y, "* Gained practical knowledge of network security concepts, vulnerability assessment, and mitigation protocols."))
    y -= 12
    lines.append(("Helvetica", 9.5, 60, y, "* Participated in technical mentorship sessions, security testing, and hands-on practical assignments."))
    y -= 20
    
    # Coding Profiles
    y = section_header("Coding Profiles & Achievements", y)
    lines.append(("Helvetica", 9.5, 60, y, "* Solved 150+ LeetCode problems demonstrating strong problem-solving and competitive programming proficiency."))
    y -= 13
    lines.append(("Helvetica", 9.5, 60, y, "* Strong understanding of Core Data Structures: Arrays, Strings, Linked Lists, Stacks, Queues, Trees, and Recursion."))
    
    # Build PDF Content Stream
    stream_parts = []
    
    # Draw horizontal rules under section headers
    header_rules = [770, 727, 663, 503, 399, 290]
    for hr_y in header_rules:
        stream_parts.append(f"0.7 0.7 0.7 RG 1 w 50 {hr_y} m 545 {hr_y} l S\n")
        
    for font, size, x, text_y, text in lines:
        clean_text = text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")
        f_tag = "/F2" if "Bold" in font else "/F3" if "Oblique" in font else "/F1"
        stream_parts.append(f"BT {f_tag} {size} Tf {x} {text_y} Td ({clean_text}) Tj ET\n")
        
    stream_content = "".join(stream_parts)
    stream_bytes = stream_content.encode("latin-1", "replace")
    
    pdf_objects = []
    pdf_objects.append(b"<< /Type /Catalog /Pages 2 0 R >>")
    pdf_objects.append(b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>")
    pdf_objects.append(
        b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] "
        b"/Contents 4 0 R /Resources << /Font << "
        b"/F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> "
        b"/F2 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> "
        b"/F3 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >> "
        b">> >> >>"
    )
    pdf_objects.append(f"<< /Length {len(stream_bytes)} >>\nstream\n".encode("latin-1") + stream_bytes + b"\nendstream")
    
    xref_offsets = []
    output = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    for i, obj in enumerate(pdf_objects):
        xref_offsets.append(len(output))
        output.extend(f"{i+1} 0 obj\n".encode("latin-1"))
        output.extend(obj)
        output.extend(b"\nendobj\n")
        
    xref_pos = len(output)
    output.extend(f"xref\n0 {len(pdf_objects)+1}\n0000000000 65535 f \n".encode("latin-1"))
    for offset in xref_offsets:
        output.extend(f"{offset:010d} 00000 n \n".encode("latin-1"))
    output.extend(f"trailer\n<< /Size {len(pdf_objects)+1} /Root 1 0 R >>\nstartxref\n{xref_pos}\n%%EOF\n".encode("latin-1"))
    
    with open(filename, "wb") as f:
        f.write(output)
    print(f"Generated {filename} successfully ({len(output)} bytes)")

if __name__ == "__main__":
    create_resume_pdf()
