// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-v3-or-Later

var PosixBracketExpressions = {
  alnum : '\\u0030-\\u0039'
        + '\\u0041-\\u005a'
        + '\\u0061-\\u007a'
        + '\\u00aa'
        + '\\u00b5'
        + '\\u00ba'
        + '\\u00c0-\\u00d6'
        + '\\u00d8-\\u00f6'
        + '\\u00f8-\\u02c1'
        + '\\u02c6-\\u02d1'
        + '\\u02e0-\\u02e4'
        + '\\u02ec'
        + '\\u02ee'
        + '\\u0345'
        + '\\u0370-\\u0374'
        + '\\u0376-\\u0377'
        + '\\u037a-\\u037d'
        + '\\u0386'
        + '\\u0388-\\u038a'
        + '\\u038c'
        + '\\u038e-\\u03a1'
        + '\\u03a3-\\u03f5'
        + '\\u03f7-\\u0481'
        + '\\u048a-\\u0527'
        + '\\u0531-\\u0556'
        + '\\u0559'
        + '\\u0561-\\u0587'
        + '\\u05b0-\\u05bd'
        + '\\u05bf'
        + '\\u05c1-\\u05c2'
        + '\\u05c4-\\u05c5'
        + '\\u05c7'
        + '\\u05d0-\\u05ea'
        + '\\u05f0-\\u05f2'
        + '\\u0610-\\u061a'
        + '\\u0620-\\u0657'
        + '\\u0659-\\u0669'
        + '\\u066e-\\u06d3'
        + '\\u06d5-\\u06dc'
        + '\\u06e1-\\u06e8'
        + '\\u06ed-\\u06fc'
        + '\\u06ff'
        + '\\u0710-\\u073f'
        + '\\u074d-\\u07b1'
        + '\\u07c0-\\u07ea'
        + '\\u07f4-\\u07f5'
        + '\\u07fa'
        + '\\u0800-\\u0817'
        + '\\u081a-\\u082c'
        + '\\u0840-\\u0858'
        + '\\u08a0'
        + '\\u08a2-\\u08ac'
        + '\\u08e4-\\u08e9'
        + '\\u08f0-\\u08fe'
        + '\\u0900-\\u093b'
        + '\\u093d-\\u094c'
        + '\\u094e-\\u0950'
        + '\\u0955-\\u0963'
        + '\\u0966-\\u096f'
        + '\\u0971-\\u0977'
        + '\\u0979-\\u097f'
        + '\\u0981-\\u0983'
        + '\\u0985-\\u098c'
        + '\\u098f-\\u0990'
        + '\\u0993-\\u09a8'
        + '\\u09aa-\\u09b0'
        + '\\u09b2'
        + '\\u09b6-\\u09b9'
        + '\\u09bd-\\u09c4'
        + '\\u09c7-\\u09c8'
        + '\\u09cb-\\u09cc'
        + '\\u09ce'
        + '\\u09d7'
        + '\\u09dc-\\u09dd'
        + '\\u09df-\\u09e3'
        + '\\u09e6-\\u09f1'
        + '\\u0a01-\\u0a03'
        + '\\u0a05-\\u0a0a'
        + '\\u0a0f-\\u0a10'
        + '\\u0a13-\\u0a28'
        + '\\u0a2a-\\u0a30'
        + '\\u0a32-\\u0a33'
        + '\\u0a35-\\u0a36'
        + '\\u0a38-\\u0a39'
        + '\\u0a3e-\\u0a42'
        + '\\u0a47-\\u0a48'
        + '\\u0a4b-\\u0a4c'
        + '\\u0a51'
        + '\\u0a59-\\u0a5c'
        + '\\u0a5e'
        + '\\u0a66-\\u0a75'
        + '\\u0a81-\\u0a83'
        + '\\u0a85-\\u0a8d'
        + '\\u0a8f-\\u0a91'
        + '\\u0a93-\\u0aa8'
        + '\\u0aaa-\\u0ab0'
        + '\\u0ab2-\\u0ab3'
        + '\\u0ab5-\\u0ab9'
        + '\\u0abd-\\u0ac5'
        + '\\u0ac7-\\u0ac9'
        + '\\u0acb-\\u0acc'
        + '\\u0ad0'
        + '\\u0ae0-\\u0ae3'
        + '\\u0ae6-\\u0aef'
        + '\\u0b01-\\u0b03'
        + '\\u0b05-\\u0b0c'
        + '\\u0b0f-\\u0b10'
        + '\\u0b13-\\u0b28'
        + '\\u0b2a-\\u0b30'
        + '\\u0b32-\\u0b33'
        + '\\u0b35-\\u0b39'
        + '\\u0b3d-\\u0b44'
        + '\\u0b47-\\u0b48'
        + '\\u0b4b-\\u0b4c'
        + '\\u0b56-\\u0b57'
        + '\\u0b5c-\\u0b5d'
        + '\\u0b5f-\\u0b63'
        + '\\u0b66-\\u0b6f'
        + '\\u0b71'
        + '\\u0b82-\\u0b83'
        + '\\u0b85-\\u0b8a'
        + '\\u0b8e-\\u0b90'
        + '\\u0b92-\\u0b95'
        + '\\u0b99-\\u0b9a'
        + '\\u0b9c'
        + '\\u0b9e-\\u0b9f'
        + '\\u0ba3-\\u0ba4'
        + '\\u0ba8-\\u0baa'
        + '\\u0bae-\\u0bb9'
        + '\\u0bbe-\\u0bc2'
        + '\\u0bc6-\\u0bc8'
        + '\\u0bca-\\u0bcc'
        + '\\u0bd0'
        + '\\u0bd7'
        + '\\u0be6-\\u0bef'
        + '\\u0c01-\\u0c03'
        + '\\u0c05-\\u0c0c'
        + '\\u0c0e-\\u0c10'
        + '\\u0c12-\\u0c28'
        + '\\u0c2a-\\u0c33'
        + '\\u0c35-\\u0c39'
        + '\\u0c3d-\\u0c44'
        + '\\u0c46-\\u0c48'
        + '\\u0c4a-\\u0c4c'
        + '\\u0c55-\\u0c56'
        + '\\u0c58-\\u0c59'
        + '\\u0c60-\\u0c63'
        + '\\u0c66-\\u0c6f'
        + '\\u0c82-\\u0c83'
        + '\\u0c85-\\u0c8c'
        + '\\u0c8e-\\u0c90'
        + '\\u0c92-\\u0ca8'
        + '\\u0caa-\\u0cb3'
        + '\\u0cb5-\\u0cb9'
        + '\\u0cbd-\\u0cc4'
        + '\\u0cc6-\\u0cc8'
        + '\\u0cca-\\u0ccc'
        + '\\u0cd5-\\u0cd6'
        + '\\u0cde'
        + '\\u0ce0-\\u0ce3'
        + '\\u0ce6-\\u0cef'
        + '\\u0cf1-\\u0cf2'
        + '\\u0d02-\\u0d03'
        + '\\u0d05-\\u0d0c'
        + '\\u0d0e-\\u0d10'
        + '\\u0d12-\\u0d3a'
        + '\\u0d3d-\\u0d44'
        + '\\u0d46-\\u0d48'
        + '\\u0d4a-\\u0d4c'
        + '\\u0d4e'
        + '\\u0d57'
        + '\\u0d60-\\u0d63'
        + '\\u0d66-\\u0d6f'
        + '\\u0d7a-\\u0d7f'
        + '\\u0d82-\\u0d83'
        + '\\u0d85-\\u0d96'
        + '\\u0d9a-\\u0db1'
        + '\\u0db3-\\u0dbb'
        + '\\u0dbd'
        + '\\u0dc0-\\u0dc6'
        + '\\u0dcf-\\u0dd4'
        + '\\u0dd6'
        + '\\u0dd8-\\u0ddf'
        + '\\u0df2-\\u0df3'
        + '\\u0e01-\\u0e3a'
        + '\\u0e40-\\u0e46'
        + '\\u0e4d'
        + '\\u0e50-\\u0e59'
        + '\\u0e81-\\u0e82'
        + '\\u0e84'
        + '\\u0e87-\\u0e88'
        + '\\u0e8a'
        + '\\u0e8d'
        + '\\u0e94-\\u0e97'
        + '\\u0e99-\\u0e9f'
        + '\\u0ea1-\\u0ea3'
        + '\\u0ea5'
        + '\\u0ea7'
        + '\\u0eaa-\\u0eab'
        + '\\u0ead-\\u0eb9'
        + '\\u0ebb-\\u0ebd'
        + '\\u0ec0-\\u0ec4'
        + '\\u0ec6'
        + '\\u0ecd'
        + '\\u0ed0-\\u0ed9'
        + '\\u0edc-\\u0edf'
        + '\\u0f00'
        + '\\u0f20-\\u0f29'
        + '\\u0f40-\\u0f47'
        + '\\u0f49-\\u0f6c'
        + '\\u0f71-\\u0f81'
        + '\\u0f88-\\u0f97'
        + '\\u0f99-\\u0fbc'
        + '\\u1000-\\u1036'
        + '\\u1038'
        + '\\u103b-\\u1049'
        + '\\u1050-\\u1062'
        + '\\u1065-\\u1068'
        + '\\u106e-\\u1086'
        + '\\u108e'
        + '\\u1090-\\u1099'
        + '\\u109c-\\u109d'
        + '\\u10a0-\\u10c5'
        + '\\u10c7'
        + '\\u10cd'
        + '\\u10d0-\\u10fa'
        + '\\u10fc-\\u1248'
        + '\\u124a-\\u124d'
        + '\\u1250-\\u1256'
        + '\\u1258'
        + '\\u125a-\\u125d'
        + '\\u1260-\\u1288'
        + '\\u128a-\\u128d'
        + '\\u1290-\\u12b0'
        + '\\u12b2-\\u12b5'
        + '\\u12b8-\\u12be'
        + '\\u12c0'
        + '\\u12c2-\\u12c5'
        + '\\u12c8-\\u12d6'
        + '\\u12d8-\\u1310'
        + '\\u1312-\\u1315'
        + '\\u1318-\\u135a'
        + '\\u135f'
        + '\\u1380-\\u138f'
        + '\\u13a0-\\u13f4'
        + '\\u1401-\\u166c'
        + '\\u166f-\\u167f'
        + '\\u1681-\\u169a'
        + '\\u16a0-\\u16ea'
        + '\\u16ee-\\u16f0'
        + '\\u1700-\\u170c'
        + '\\u170e-\\u1713'
        + '\\u1720-\\u1733'
        + '\\u1740-\\u1753'
        + '\\u1760-\\u176c'
        + '\\u176e-\\u1770'
        + '\\u1772-\\u1773'
        + '\\u1780-\\u17b3'
        + '\\u17b6-\\u17c8'
        + '\\u17d7'
        + '\\u17dc'
        + '\\u17e0-\\u17e9'
        + '\\u1810-\\u1819'
        + '\\u1820-\\u1877'
        + '\\u1880-\\u18aa'
        + '\\u18b0-\\u18f5'
        + '\\u1900-\\u191c'
        + '\\u1920-\\u192b'
        + '\\u1930-\\u1938'
        + '\\u1946-\\u196d'
        + '\\u1970-\\u1974'
        + '\\u1980-\\u19ab'
        + '\\u19b0-\\u19c9'
        + '\\u19d0-\\u19d9'
        + '\\u1a00-\\u1a1b'
        + '\\u1a20-\\u1a5e'
        + '\\u1a61-\\u1a74'
        + '\\u1a80-\\u1a89'
        + '\\u1a90-\\u1a99'
        + '\\u1aa7'
        + '\\u1b00-\\u1b33'
        + '\\u1b35-\\u1b43'
        + '\\u1b45-\\u1b4b'
        + '\\u1b50-\\u1b59'
        + '\\u1b80-\\u1ba9'
        + '\\u1bac-\\u1be5'
        + '\\u1be7-\\u1bf1'
        + '\\u1c00-\\u1c35'
        + '\\u1c40-\\u1c49'
        + '\\u1c4d-\\u1c7d'
        + '\\u1ce9-\\u1cec'
        + '\\u1cee-\\u1cf3'
        + '\\u1cf5-\\u1cf6'
        + '\\u1d00-\\u1dbf'
        + '\\u1e00-\\u1f15'
        + '\\u1f18-\\u1f1d'
        + '\\u1f20-\\u1f45'
        + '\\u1f48-\\u1f4d'
        + '\\u1f50-\\u1f57'
        + '\\u1f59'
        + '\\u1f5b'
        + '\\u1f5d'
        + '\\u1f5f-\\u1f7d'
        + '\\u1f80-\\u1fb4'
        + '\\u1fb6-\\u1fbc'
        + '\\u1fbe'
        + '\\u1fc2-\\u1fc4'
        + '\\u1fc6-\\u1fcc'
        + '\\u1fd0-\\u1fd3'
        + '\\u1fd6-\\u1fdb'
        + '\\u1fe0-\\u1fec'
        + '\\u1ff2-\\u1ff4'
        + '\\u1ff6-\\u1ffc'
        + '\\u2071'
        + '\\u207f'
        + '\\u2090-\\u209c'
        + '\\u2102'
        + '\\u2107'
        + '\\u210a-\\u2113'
        + '\\u2115'
        + '\\u2119-\\u211d'
        + '\\u2124'
        + '\\u2126'
        + '\\u2128'
        + '\\u212a-\\u212d'
        + '\\u212f-\\u2139'
        + '\\u213c-\\u213f'
        + '\\u2145-\\u2149'
        + '\\u214e'
        + '\\u2160-\\u2188'
        + '\\u24b6-\\u24e9'
        + '\\u2c00-\\u2c2e'
        + '\\u2c30-\\u2c5e'
        + '\\u2c60-\\u2ce4'
        + '\\u2ceb-\\u2cee'
        + '\\u2cf2-\\u2cf3'
        + '\\u2d00-\\u2d25'
        + '\\u2d27'
        + '\\u2d2d'
        + '\\u2d30-\\u2d67'
        + '\\u2d6f'
        + '\\u2d80-\\u2d96'
        + '\\u2da0-\\u2da6'
        + '\\u2da8-\\u2dae'
        + '\\u2db0-\\u2db6'
        + '\\u2db8-\\u2dbe'
        + '\\u2dc0-\\u2dc6'
        + '\\u2dc8-\\u2dce'
        + '\\u2dd0-\\u2dd6'
        + '\\u2dd8-\\u2dde'
        + '\\u2de0-\\u2dff'
        + '\\u2e2f'
        + '\\u3005-\\u3007'
        + '\\u3021-\\u3029'
        + '\\u3031-\\u3035'
        + '\\u3038-\\u303c'
        + '\\u3041-\\u3096'
        + '\\u309d-\\u309f'
        + '\\u30a1-\\u30fa'
        + '\\u30fc-\\u30ff'
        + '\\u3105-\\u312d'
        + '\\u3131-\\u318e'
        + '\\u31a0-\\u31ba'
        + '\\u31f0-\\u31ff'
        + '\\u3400-\\u4db5'
        + '\\u4e00-\\u9fcc'
        + '\\ua000-\\ua48c'
        + '\\ua4d0-\\ua4fd'
        + '\\ua500-\\ua60c'
        + '\\ua610-\\ua62b'
        + '\\ua640-\\ua66e'
        + '\\ua674-\\ua67b'
        + '\\ua67f-\\ua697'
        + '\\ua69f-\\ua6ef'
        + '\\ua717-\\ua71f'
        + '\\ua722-\\ua788'
        + '\\ua78b-\\ua78e'
        + '\\ua790-\\ua793'
        + '\\ua7a0-\\ua7aa'
        + '\\ua7f8-\\ua801'
        + '\\ua803-\\ua805'
        + '\\ua807-\\ua80a'
        + '\\ua80c-\\ua827'
        + '\\ua840-\\ua873'
        + '\\ua880-\\ua8c3'
        + '\\ua8d0-\\ua8d9'
        + '\\ua8f2-\\ua8f7'
        + '\\ua8fb'
        + '\\ua900-\\ua92a'
        + '\\ua930-\\ua952'
        + '\\ua960-\\ua97c'
        + '\\ua980-\\ua9b2'
        + '\\ua9b4-\\ua9bf'
        + '\\ua9cf-\\ua9d9'
        + '\\uaa00-\\uaa36'
        + '\\uaa40-\\uaa4d'
        + '\\uaa50-\\uaa59'
        + '\\uaa60-\\uaa76'
        + '\\uaa7a'
        + '\\uaa80-\\uaabe'
        + '\\uaac0'
        + '\\uaac2'
        + '\\uaadb-\\uaadd'
        + '\\uaae0-\\uaaef'
        + '\\uaaf2-\\uaaf5'
        + '\\uab01-\\uab06'
        + '\\uab09-\\uab0e'
        + '\\uab11-\\uab16'
        + '\\uab20-\\uab26'
        + '\\uab28-\\uab2e'
        + '\\uabc0-\\uabea'
        + '\\uabf0-\\uabf9'
        + '\\uac00-\\ud7a3'
        + '\\ud7b0-\\ud7c6'
        + '\\ud7cb-\\ud7fb'
        + '\\uf900-\\ufa6d'
        + '\\ufa70-\\ufad9'
        + '\\ufb00-\\ufb06'
        + '\\ufb13-\\ufb17'
        + '\\ufb1d-\\ufb28'
        + '\\ufb2a-\\ufb36'
        + '\\ufb38-\\ufb3c'
        + '\\ufb3e'
        + '\\ufb40-\\ufb41'
        + '\\ufb43-\\ufb44'
        + '\\ufb46-\\ufbb1'
        + '\\ufbd3-\\ufd3d'
        + '\\ufd50-\\ufd8f'
        + '\\ufd92-\\ufdc7'
        + '\\ufdf0-\\ufdfb'
        + '\\ufe70-\\ufe74'
        + '\\ufe76-\\ufefc'
        + '\\uff10-\\uff19'
        + '\\uff21-\\uff3a'
        + '\\uff41-\\uff5a'
        + '\\uff66-\\uffbe'
        + '\\uffc2-\\uffc7'
        + '\\uffca-\\uffcf'
        + '\\uffd2-\\uffd7'
        + '\\uffda-\\uffdc'
};
// @license-end