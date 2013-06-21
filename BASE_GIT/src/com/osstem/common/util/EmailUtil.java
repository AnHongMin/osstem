package com.osstem.common.util;

import java.util.Vector;
import java.io.File;

import javax.mail.internet.MimeUtility;

import org.apache.commons.mail.EmailAttachment;
import org.apache.commons.mail.HtmlEmail;

/**
 * 이메일 관련 공통 클래스
 * 
 * @author
 * @version 1.0
 */
public class EmailUtil {

	/**
	 * 이메일을 보냅니다.
	 * 
	 * @param str_to_email
	 *            받는사람 이메일
	 * @param str_to_name
	 *            받는사람 이름
	 * @param str_from_email
	 *            보내는사람 이메일
	 * @param str_from_name
	 *            보내는사람 이름
	 * @param str_title
	 *            제목
	 * @param str_content
	 *            내용
	 * @param vec_files
	 *            첨부파일
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("rawtypes")
	public int setSendMail(String str_to_email, String str_to_name,String str_from_email, String str_from_name, String str_title,String str_content, Vector vec_files) throws Exception {
		int int_result = 0;

		try {
			int int_i = 0; // 임시변수

			EmailAttachment attachment = new EmailAttachment(); // 이메일첨부파일객체

			File file = null; // File 임시변수

			// 이메일 메시지를 만듭니다.
			HtmlEmail email = new HtmlEmail();
			email.setCharset("UTF-8"); // 인코딩셋팅
			email.setHostName("211.111.213.200"); // SMTP 서버
			email.addTo(str_to_email, str_to_name); // 받는사람 정보
			email.setFrom(str_from_email, str_from_name); // 보내는사람 정보
			email.setSubject(str_title); // 제목
			email.setHtmlMsg(str_content); // 내용

			// 첨부파일이 있으면 갯수 만큼 처리합니다.
			if (vec_files != null) {
				for (int_i = 0; int_i < vec_files.size(); int_i++) {
					file = new File(vec_files.elementAt(int_i).toString());
					if (file.isFile()) {
						attachment.setPath(vec_files.elementAt(int_i).toString());
						attachment.setDisposition(EmailAttachment.ATTACHMENT);
						attachment.setDescription("commons-email api");
						attachment.setName(MimeUtility.encodeText(attachment.getName()));
						email.attach(attachment);
					}
				}
			}

			// 보내기
			email.send();
		} catch (Exception e) {
			return 1;
		}

		return int_result;
	}

}
