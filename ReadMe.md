# JWT

### JWT는 자가수용적이므로, HTTP헤더에 넣어서 요청도 되고, URL 파라미터로 전달도 가능하다.

* 사용되는 상황
    * 회원인증 : 서버는 유저 정보에 기반한 토큰을 발급해주고, 유저는 서버에 요청을 할 때마다 JWT를 포함하여 요청한다.
    * 정보교류 : 보낸이가 바뀌었는지, 정보가 조작되었는지 확인하기 위함

JWT는 .를 구분자로 aaaaa.bbbbb.ccccc (a = header, b = payload, c = signature)로 이루어져있다.

# header
header는 두가지 정보를 지닌다.
{
    "type": "JWT",
    "alg" : "HS256"
}
typ : 토큰의 타입, 여기서는 JWT이다.
alg : 해싱 알고리즘을 의미한다. 보통 RSA, HMAC SHA256을 사용한다. 이 부분은 토큰을 검증하는 signature에서 이용된다.

# payload 
토큰에 담을 정보가 들어있다. 정보의 한 조각을 클레임(Claim)이라고 한다.


- 클레임의 종류
    1. 등록된(registered) 클레임
    2. 공개(public) 클레임
    3. 비공개(private) 클레임


## 등록된 클레임
이름이 이미 정해진 클레임들이며(예약)
등록된 클레임의 사용은 모두 선택적(optional)이며, 클레임 이름들은 다음과 같다.

- iss : 토큰 발급자(issuer)
- sub : 토큰 제목(subject)
- aud : 토큰 대상자(audience)
- exp : 토큰의 만료시간(expiration), 시간은 NumericDate형식이어야한다(예 : 1445345990) 언제나 현재 시간보다 이후로 설정되어 있어야한다.
- nbf : Not Before를 의미하며, 토큰의 활성 날짜를 의미한다. 여기도 NumericDate 형식을 사용하며, 이 날짜가 지날때까지 토큰이 처리되지않는다.
- iat : 토큰이 발급된 시간(issued at), 이 값을 사용하면 토큰의 age를 확인할 수 있다.
- jti : JWT의 고유 식별자이다. 중복 처리 방지 및 일회용 토큰에 유용하다.

## 공개 클레임(public)

충돌이 방지된 이름을 가져야한다, 충돌방지를 위해 이름을 URI 형식으로 짓는다
{
    "https://velopert.com/jwt_claims/is_admin":true
}

## 비공개 클레임(private)
공개 클레임과 달리 이름이 충돌 될 수 있으니 주의해야한다.
보통 클라이언트 <-> 서버간 협의하에 사용되는 클레임 이름이다.
{
    "username": "velopert"
}

**예제 payload**
{
    "iss": "velopert.com",
    "exp": "144588800000",
    "https://velopert.com/jwt_claims/is_admin": true,
    "userId":234254345,
    "username": "velopert"
}

# signature
서명은 헤더의 인코딩값 + 정보의 인코딩값을 합친 후 주어진 비밀키로 해쉬를 생성한다.

pseudo code는 다음과 같다.
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)